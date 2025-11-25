"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // 检查用户是否已登录
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const userData = localStorage.getItem("user")

    if (isLoggedIn === "true" && userData) {
      // 如果已登录，跳转到仪表板
      router.push("/dashboard")
    } else {
      // 如果未登录，跳转到登录页
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="text-blue-600 font-medium">正在加载系统...</span>
      </div>
    </div>
  )
}
