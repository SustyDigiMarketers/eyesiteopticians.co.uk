import { useState, useEffect } from 'react';
import { createSupabaseClient } from '../api';

// Use loose types for Supabase entities to avoid import errors
type Session = any;
type User = any;

type UserRole = 'admin' | 'superadmin' | null;

// For this application, any authenticated user is treated as a 'superadmin'.
const getRoleFromUser = (user: User | null): UserRole => {
    if (user) {
        // All signed-in users are superadmins in this setup.
        return 'superadmin';
    }
    return null;
};

export const useAuth = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<UserRole>(null);

    useEffect(() => {
        let subscription: { unsubscribe: () => void } | null = null;

        const initAuth = async () => {
            try {
                // safely create client; if this throws, catch block handles it
                const supabase = createSupabaseClient();
                
                // safely get session; if fetch fails, catch block handles it
                const { data, error } = await supabase.auth.getSession();
                if (error) throw error;

                setSession(data.session);
                setUser(data.session?.user ?? null);
                setUserRole(getRoleFromUser(data.session?.user ?? null));

                const { data: authListener } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
                    // Only update if we are not in a mock session state
                    setSession((currentSession: any) => {
                        // If we have a mock session (identified by the mock token), ignore external updates
                        if (currentSession?.access_token === 'mock-token-bypass') {
                            return currentSession;
                        }
                        return session;
                    });
                    
                    setUser((currentUser: any) => {
                        if (currentUser?.id === 'mock-admin-id') {
                            return currentUser;
                        }
                        return session?.user ?? null;
                    });

                    setUserRole((currentRole: UserRole) => {
                        if (currentRole === 'superadmin' && session === null) {
                             // Check if it was our mock user before clearing
                             return currentRole; 
                        }
                         return getRoleFromUser(session?.user ?? null);
                    });
                });
                subscription = authListener.subscription;

            } catch (error) {
                // Silently fail for offline/network issues to prevent "Failed to fetch" console errors
                console.debug("Auth initialization skipped (Offline Mode):", error);
                setSession(null);
                setUser(null);
                setUserRole(null);
            }
        };

        initAuth();

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    const login = async (credentials: { email: string, password: string }) => {
        if (!credentials || !credentials.email || !credentials.password) {
             return { data: { user: null, session: null }, error: { message: "Missing credentials" } };
        }

        // 1. ATTEMPT REAL LOGIN FIRST
        // If you created this user in Supabase, this will log you in with REAL permissions.
        try {
            const supabase = createSupabaseClient();
            const { data, error } = await supabase.auth.signInWithPassword(credentials);
            
            if (!error && data.user) {
                console.log("Logged in as authenticated Supabase user.");
                return { data, error: null };
            }
        } catch (realLoginError) {
            console.log("Real login failed, checking for admin bypass...");
        }

        // 2. FALLBACK TO SIMULATED ADMIN
        // This logic only runs if the real login failed (e.g., you haven't created the user in Supabase yet).
        const emailInput = credentials.email.trim().toLowerCase();
        const passwordInput = credentials.password.trim();

        if (emailInput === 'admin@faustina.com' && passwordInput === 'FaustinaAdmin123!') {
             console.log("Logged in as Simulated Admin (Demo Mode). Database writes may fail if RLS is on.");
             const mockUser: any = {
                id: 'mock-admin-id',
                aud: 'authenticated',
                role: 'authenticated',
                email: emailInput,
                email_confirmed_at: new Date().toISOString(),
                phone: '',
                confirmed_at: new Date().toISOString(),
                last_sign_in_at: new Date().toISOString(),
                app_metadata: { provider: 'email', providers: ['email'] },
                user_metadata: {},
                identities: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            
            const mockSession: any = {
                access_token: 'mock-token-bypass',
                token_type: 'bearer',
                expires_in: 3600,
                refresh_token: 'mock-refresh-token',
                user: mockUser,
            };

            setSession(mockSession);
            setUser(mockUser);
            setUserRole('superadmin');

            return { data: { user: mockUser, session: mockSession }, error: null };
        }

        return { data: { user: null, session: null }, error: { message: "Invalid login credentials" } };
    };

    const logout = async () => {
        // Handle logout for the mock user
        if (user?.id === 'mock-admin-id') {
            setSession(null);
            setUser(null);
            setUserRole(null);
            return;
        }

        try {
            const supabase = createSupabaseClient();
            await supabase.auth.signOut();
        } catch (error) {
            console.debug("Logout failed (likely offline):", error);
        }
    };

    return {
        session,
        user,
        userRole,
        login,
        logout,
    };
};