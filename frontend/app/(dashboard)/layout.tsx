import Footer from "@/components/shared/dashboard/Footer";
import Header from "@/components/shared/dashboard/Header";


export default function GuestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <section className="w-full bg-clBodyBg min-h-screen">
            <Header />
            <main className="w-full">{children}</main>
            <Footer />
        </section>
    );
}