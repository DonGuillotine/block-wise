import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";

export default function GuestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <section className="w-full">
            <NavBar />
            <main className="w-full">{children}</main>
            <Footer />
        </section>
    );
}