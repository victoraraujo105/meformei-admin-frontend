import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div>
      <h1>Não autorizado</h1>
      <p>
        View <Link href="/login">Ir para login</Link>
      </p>
    </div>
  )
}