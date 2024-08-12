import ProtectedComponent from "@/components/protectComponents";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedComponent>{children}</ProtectedComponent>;
}
