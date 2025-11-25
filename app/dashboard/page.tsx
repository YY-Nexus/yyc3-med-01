"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Users,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Shield,
  Heart,
  Brain,
  Stethoscope,
  User,
  Clock,
  CheckCircle,
} from "lucide-react"

interface UserData {
  id: number
  email: string
  name: string
  role: string
  loginTime: string
  token: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user")
        const isLoggedIn = localStorage.getItem("isLoggedIn")

        console.log("检查登录状态:", { userData: !!userData, isLoggedIn })

        if (!userData || !isLoggedIn || isLoggedIn !== "true") {
          console.log("未登录，跳转到登录页")
          router.push("/login")
          return
        }

        const parsedUser = JSON.parse(userData)
        console.log("用户数据:", parsedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("解析用户数据错误:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    // 延迟检查，确保localStorage已加载
    setTimeout(checkAuth, 100)
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/login")
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "doctor":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "nurse":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "doctor":
        return <Stethoscope className="h-4 w-4" />
      case "nurse":
        return <Heart className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "admin":
        return "系统管理员"
      case "doctor":
        return "医生"
      case "nurse":
        return "护士"
      default:
        return "用户"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-blue-600 font-medium">系统加载中...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-blue-600 mb-4">正在验证用户身份...</p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-blue-800">言语云³医疗AI系统</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {getRoleIcon(user.role)}
                <span className="text-gray-700 font-medium">{user.name}</span>
                <Badge className={getRoleColor(user.role)}>{getRoleName(user.role)}</Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎信息 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来，{user.name}！</h2>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>登录时间：{new Date(user.loginTime).toLocaleString("zh-CN")}</span>
          </div>
        </div>

        {/* 快速统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">今日患者</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">24</div>
              <p className="text-xs text-gray-500">比昨天增加 12%</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">AI诊断</CardTitle>
              <Brain className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">156</div>
              <p className="text-xs text-gray-500">准确率 98.5%</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">医疗记录</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">1,234</div>
              <p className="text-xs text-gray-500">本月新增 89 条</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">预约咨询</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">18</div>
              <p className="text-xs text-gray-500">今日待处理</p>
            </CardContent>
          </Card>
        </div>

        {/* 功能模块 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Activity className="h-5 w-5 mr-2" />
                患者管理
              </CardTitle>
              <CardDescription>管理患者信息、病历记录和治疗方案</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">进入模块</Button>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Brain className="h-5 w-5 mr-2" />
                AI诊断助手
              </CardTitle>
              <CardDescription>智能诊断分析和医疗建议生成</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700">开始诊断</Button>
            </CardContent>
          </Card>

          <Card className="border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <FileText className="h-5 w-5 mr-2" />
                医疗记录
              </CardTitle>
              <CardDescription>电子病历管理和医疗数据分析</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">查看记录</Button>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <Calendar className="h-5 w-5 mr-2" />
                远程咨询
              </CardTitle>
              <CardDescription>在线医疗咨询和远程诊疗服务</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">开始咨询</Button>
            </CardContent>
          </Card>

          <Card className="border-cyan-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-800">
                <Heart className="h-5 w-5 mr-2" />
                健康数据
              </CardTitle>
              <CardDescription>健康指标监测和趋势分析</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">查看数据</Button>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <Settings className="h-5 w-5 mr-2" />
                系统设置
              </CardTitle>
              <CardDescription>系统配置和用户权限管理</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-red-600 hover:bg-red-700">系统设置</Button>
            </CardContent>
          </Card>
        </div>

        {/* 成功登录提示 */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-green-800 font-medium">登录成功！欢迎使用言语云³医疗AI系统</p>
          </div>
          <p className="text-green-600 text-sm mt-1">您已成功登录系统，可以开始使用各项功能模块。</p>
        </div>
      </main>
    </div>
  )
}
