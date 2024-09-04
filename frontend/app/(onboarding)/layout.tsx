export default function OnboardingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <section className="w-full bg-clBodyBg min-h-screen">
            <main className="w-full">{children}</main>
        </section>
    );
}