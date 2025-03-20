// Simple client-side auth service with no external dependencies

type User = {
  id: string
  email: string
  name?: string
  avatarUrl?: string
  role: "user" | "admin"
  isVerified: boolean
}

type AuthState = {
  user: User | null
  session: { access_token: string } | null
}

// Simple in-memory/localStorage auth service
export const authService = {
  // Initialize auth state from localStorage
  getAuthState(): AuthState {
    if (typeof window === "undefined") {
      return { user: null, session: null }
    }

    try {
      const authData = localStorage.getItem("auth_data")
      return authData ? JSON.parse(authData) : { user: null, session: null }
    } catch (error) {
      console.error("Failed to parse auth data:", error)
      return { user: null, session: null }
    }
  },

  // Save auth state to localStorage
  saveAuthState(state: AuthState): void {
    if (typeof window === "undefined") return

    // Save to localStorage
    localStorage.setItem("auth_data", JSON.stringify(state))

    // Also set a cookie for server-side auth checks
    if (state.session) {
      document.cookie = `auth_token=${state.session.access_token}; path=/; max-age=2592000` // 30 days
    } else {
      document.cookie = "auth_token=; path=/; max-age=0"
    }
  },

  // Clear auth state
  clearAuthState(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem("auth_data")
    document.cookie = "auth_token=; path=/; max-age=0"
  },

  // Sign in with email and password
  async signInWithEmail(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    // Admin hardcoded for demo purposes
    if (email === "admin@podmanage.com" && password === "admin123") {
      const user: User = {
        id: "admin-user-id",
        email: "admin@podmanage.com",
        name: "Admin User",
        role: "admin",
        isVerified: true,
      }

      this.saveAuthState({
        user,
        session: { access_token: `demo-token-${Date.now()}` },
      })

      return { success: true }
    }

    // For demo purposes, any email/password combination works
    const user: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split("@")[0],
      role: "user",
      isVerified: true,
    }

    this.saveAuthState({
      user,
      session: { access_token: `demo-token-${Date.now()}` },
    })

    return { success: true }
  },

  // Sign up with email and password
  async signUpWithEmail(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    // Create unverified user
    const user: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split("@")[0],
      role: "user",
      isVerified: false,
    }

    this.saveAuthState({
      user,
      session: { access_token: `demo-token-${Date.now()}` },
    })

    // Auto-verify after 3 seconds for demo purposes
    setTimeout(() => {
      const currentState = this.getAuthState()
      if (currentState.user && currentState.user.email === email) {
        this.saveAuthState({
          ...currentState,
          user: { ...currentState.user, isVerified: true },
        })
      }
    }, 3000)

    return { success: true }
  },

  // Sign in with Google (simulated)
  async signInWithGoogle(): Promise<{ success: boolean; error?: string }> {
    // Create a simulated Google user instead of redirecting
    const user: User = {
      id: `google-user-${Date.now()}`,
      email: `google-user-${Date.now()}@gmail.com`,
      name: `Google User`,
      avatarUrl: "/placeholder.svg?height=96&width=96",
      role: "user",
      isVerified: true,
    }

    this.saveAuthState({
      user,
      session: { access_token: `google-token-${Date.now()}` },
    })

    return { success: true }
  },

  // Sign out
  async signOut(): Promise<void> {
    this.clearAuthState()
    // Redirect to home page after sign out
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const { user, session } = this.getAuthState()
    return !!user && !!session
  },

  // Check if user is verified
  isVerified(): boolean {
    const { user } = this.getAuthState()
    return !!user && user.isVerified
  },

  // Get current user
  getCurrentUser(): User | null {
    return this.getAuthState().user
  },

  // Check if user is admin
  isAdmin(): boolean {
    const { user } = this.getAuthState()
    return !!user && user.role === "admin"
  },

  updateUserProfile(profile: { name?: string; avatarUrl?: string }): void {
    const currentState = this.getAuthState()
    if (currentState.user) {
      const updatedUser = { ...currentState.user, ...profile }
      this.saveAuthState({ ...currentState, user: updatedUser })
    }
  },
}

export const logout = async (): Promise<void> => {
  authService.signOut()
}

export const getUserProfile = (): User | null => {
  return authService.getCurrentUser()
}

export const updateUserProfile = (profile: { name?: string; avatarUrl?: string }): void => {
  authService.updateUserProfile(profile)
}

