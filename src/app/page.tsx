"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Users, CreditCard, Shield, CheckCircle, Key } from "lucide-react";
import Link from "next/link";
import { useNotifications } from "@/components/notifications/notification-context";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";


export default function Home() {
    const { data: session } = useSession();

    const { addNotification } = useNotifications();
    const isOnline = useNetworkStatus();

    // Enhanced sign-in handler with error handling
    const handleSignIn = async () => {
        if (session) {
            addNotification({
                type: "info",
                title: "Already signed in",
                message: `You're already signed in as ${session.user?.email}`,
                duration: 4000,
            });
            return;
        }

        if (!isOnline) {
            addNotification({
                type: 'warning',
                title: 'No Internet Connection',
                message: 'Please check your internet connection and try again.',
                duration: 5000,
            });
            return;
        }

        try {
            // Show loading notification
            addNotification({
                type: 'info',
                title: 'Signing In',
                message: 'Please wait while we connect to Google...',
                duration: 3000,
            });

            await signIn("google");
        } catch (error) {
            addNotification({
                type: 'error',
                title: 'Sign-in Failed',
                message: 'An unexpected error occurred. Please try again.',
                duration: 5000,
                actions: [
                    {
                        label: 'Retry',
                        onClick: () => handleSignIn()
                    }
                ]
            });
            console.error(error);
        }
    };

    const features = [
        {
            icon: Building2,
            title: "Feature One",
            description: "Comprehensive tools and features designed to streamline your workflow and boost productivity."
        },
        {
            icon: Users,
            title: "Feature Two",
            description: "Collaborate seamlessly with your team and manage relationships in one central location."
        },
        {
            icon: CreditCard,
            title: "Feature Three",
            description: "Secure payment processing with automatic tracking and detailed reporting capabilities."
        },
        {
            icon: Shield,
            title: "Feature Four",
            description: "Enterprise-grade security with 99.9% uptime guarantee to protect your valuable data."
        }
    ];

    const stats = [
        { value: "100%", label: "Secure" },
        { value: "100%", label: "Cloud Backups" },
        { value: "99.8%", label: "Success Rate" },
        { value: "24/7", label: "Support Available" }
    ];

    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto" >
            {/* Hero Section */}
            {session && (
                <section className="py-20 rounded-2xl mb-16" style={{
                    background: 'linear-gradient(135deg, var(--surface-secondary) 0%, var(--surface-hover) 100%)',
                    border: '1px solid var(--border)'
                }}>
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                                Choose your role
                            </h2>
                            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                                Get started with the tools designed for your specific needs.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group" style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)'
                            }}>
                                <CardHeader className="pb-4">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{
                                        background: 'var(--success)',
                                        opacity: '0.1'
                                    }}>
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{
                                            background: 'var(--success)'
                                        }}>
                                            <Key className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                        Role One
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                                        Manage your operations, track performance, and handle relationships with ease.
                                    </p>
                                    <div className="space-y-3">
                                        {["Create & manage items", "Track activities", "Communication tools", "Detailed reports"].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5" style={{ color: 'var(--success)' }} />
                                                <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 space-y-3">
                                        <Link href="/create-item" className="block">
                                            <Button className="w-full py-6 text-lg font-semibold rounded-xl hover:opacity-90 transition-opacity" style={{
                                                background: 'var(--foreground)',
                                                color: 'var(--background)'
                                            }}>
                                                Create New
                                            </Button>
                                        </Link>
                                        <Link href="/dashboard" className="block">
                                            <Button variant="outline" className="w-full py-6 text-lg font-semibold rounded-xl transition-colors" style={{
                                                border: '1px solid var(--border)',
                                                background: 'transparent',
                                                color: 'var(--text-primary)'
                                            }}>
                                                View Dashboard
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group" style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)'
                            }}>
                                <CardHeader className="pb-4">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{
                                        background: 'var(--text-primary)',
                                        opacity: '0.1'
                                    }}>
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{
                                            background: 'var(--text-primary)'
                                        }}>
                                            <Users className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                        Role Two
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                                        Browse options, make secure transactions, and communicate with your provider.
                                    </p>
                                    <div className="space-y-3">
                                        {["Browse available options", "Secure transactions", "Support requests", "Activity history"].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
                                                <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 space-y-3">
                                        <Link href="/browse" className="block">
                                            <Button className="w-full py-6 text-lg font-semibold rounded-xl hover:opacity-90 transition-opacity" style={{
                                                background: 'var(--foreground)',
                                                color: 'var(--background)'
                                            }}>
                                                Browse Now
                                            </Button>
                                        </Link>
                                        <Link href="/dashboard" className="block">
                                            <Button variant="outline" className="w-full py-6 text-lg font-semibold rounded-xl transition-colors" style={{
                                                border: '1px solid var(--border)',
                                                background: 'transparent',
                                                color: 'var(--text-primary)'
                                            }}>
                                                View Dashboard
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            )}

            <section className="relative overflow-hidden">
                <div className="absolute inset-0" style={{ background: 'var(--surface-hover)', opacity: '0.3' }}></div>
                <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
                    <div className="text-center max-w-4xl mx-auto">
                        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium" style={{
                            background: 'var(--surface-secondary)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border)'
                        }}>
                            Trusted by Professionals Worldwide
                        </Badge>
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
                            Modern Platform for
                            <br />
                            <span className="bg-gradient-to-r from-current to-current bg-clip-text" style={{
                                background: `linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                              Your Business
                          </span>
                        </h1>
                        <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Streamline your operations with our all-in-one platform. From setup to execution, we&#39;ve got you covered.
                        </p>

                        {session ? (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link href="/dashboard">
                                    <Button size="lg" className="px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300" style={{
                                        background: 'var(--foreground)',
                                        color: 'var(--background)'
                                    }}>
                                        Go to Dashboard
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                                    Welcome back, {session.user?.name}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    onClick={() => handleSignIn()}
                                    className="px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300"
                                    style={{
                                        background: 'var(--foreground)',
                                        color: 'var(--background)'
                                    }}
                                >
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:bg-opacity-50"
                                    style={{
                                        border: '2px solid var(--border)',
                                        background: 'transparent',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    Watch Demo
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 backdrop-blur-sm" style={{
                background: 'var(--surface-secondary)',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)'
            }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    {stat.value}
                                </div>
                                <div className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Everything you need in one place
                        </h2>
                        <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Powerful tools designed to simplify your workflow and enhance user experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm" style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)'
                            }}>
                                <CardContent className="p-8">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{
                                        background: 'var(--surface-hover)'
                                    }}>
                                        <feature.icon className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                                        {feature.title}
                                    </h3>
                                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 rounded-2xl" style={{ background: 'var(--surface-secondary)' }}>
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                        Ready to transform your workflow?
                    </h2>
                    <p className="text-xl mb-10" style={{ color: 'var(--text-secondary)' }}>
                        Join thousands of users who trust our platform for their business needs.
                    </p>
                    {!session && (
                        <Button
                            size="lg"
                            onClick={() => handleSignIn()}
                            className="px-12 py-6 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:opacity-90 transition-all duration-300"
                            style={{
                                background: 'var(--foreground)',
                                color: 'var(--background)'
                            }}
                        >
                            Get Started
                            <ArrowRight className="ml-3 h-6 w-6" />
                        </Button>
                    )}
                </div>
            </section>
        </main>
    );
}