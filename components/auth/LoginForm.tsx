"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, Mail, AlertCircle, Shield, CheckCircle, Info } from "lucide-react"
import Link from "next/link"

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  // 预设的测试账户
  const testAccounts = [
    { email: "admin@yanyucloud.com", password: "admin123", name: "系统管理员", role: "admin" },
    { email: "doctor@yanyucloud.com", password: "doctor123", name: "张医生", role: "doctor" },
    { email: "nurse@yanyucloud.com", password: "nurse123", name: "李护士", role: "nurse" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // 基本验证
    if (!formData.email.trim()) {
      setError("请输入邮箱地址")
      setIsLoading(false)
      return
    }

    if (!formData.password.trim()) {
      setError("请输入密码")
      setIsLoading(false)
      return
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("请输入有效的邮箱地址格式")
      setIsLoading(false)
      return
    }

    try {
      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 800))

      // 查找匹配的测试账户
      const matchedAccount = testAccounts.find(
        (account) => account.email.toLowerCase() === formData.email.toLowerCase(),
      )

      if (!matchedAccount) {
        setError("该邮箱地址未注册，请检查邮箱是否正确或先注册账户")
        setIsLoading(false)
        return
      }

      if (matchedAccount.password !== formData.password) {
        setError("密码错误，请检查密码是否正确")
        setIsLoading(false)
        return
      }

      // 登录成功
      setSuccess("登录验证成功！正在进入系统...")

      // 存储用户信息到本地存储
      const userData = {
        id: Date.now(),
        email: matchedAccount.email,
        name: matchedAccount.name,
        role: matchedAccount.role,
        loginTime: new Date().toISOString(),
        token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      }

      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("token", userData.token)
      localStorage.setItem("isLoggedIn", "true")

      // 触发成功回调
      onSuccess?.()

      // 立即跳转，不等待
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000)
    } catch (err) {
      console.error("Login error:", err)
      setError("系统内部错误，请稍后重试或联系技术支持")
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // 清除错误信息当用户开始输入时
    if (error) setError("")
    if (success) setSuccess("")
  }

  const handleQuickLogin = (account: (typeof testAccounts)[0]) => {
    setFormData({
      email: account.email,
      password: account.password,
    })
    setError("")
    setSuccess("")
  }

  return (
    <Card className="w-full max-w-md mx-auto border-blue-200 shadow-xl bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg border-b border-blue-100">
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-6 w-6 text-blue-600 mr-2" />
          <CardTitle className="text-2xl font-bold text-center text-blue-800">安全登录</CardTitle>
        </div>
        <CardDescription className="text-center text-blue-600">
          输入您的邮箱和密码来访问您的医疗管理账户
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 p-6">
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-700 font-medium">
              邮箱地址
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="请输入您的邮箱"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-blue-700 font-medium">
              密码
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="请输入您的密码"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-blue-50 text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              忘记密码？
            </Link>
          </div>

          {/* 测试账户快速登录 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Info className="h-4 w-4 text-blue-600 mr-2" />
              <p className="text-sm text-blue-700 font-medium">测试账户快速登录：</p>
            </div>
            <div className="space-y-2">
              {testAccounts.map((account, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleQuickLogin(account)}
                  className="w-full text-left text-xs bg-white border border-blue-200 rounded px-3 py-2 hover:bg-blue-50 transition-colors"
                  disabled={isLoading}
                >
                  <div className="font-medium text-blue-800">{account.name}</div>
                  <div className="text-blue-600">
                    {account.email} / {account.password}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 p-6 pt-0">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                验证登录中...
              </div>
            ) : (
              "安全登录"
            )}
          </Button>

          <div className="text-center text-sm text-blue-600">
            还没有账户？{" "}
            <Link href="/register" className="text-blue-700 hover:text-blue-900 hover:underline font-medium">
              立即注册
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
