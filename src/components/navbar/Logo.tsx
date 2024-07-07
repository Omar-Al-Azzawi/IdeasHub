import { Lightbulb } from "lucide-react"
import Link from "next/link"

const Logo = () => {
    return (
        <div>
            <Link href="/">
                <div className="flex items-center gap-2">
                    <Lightbulb className="text-yellow-500" />
                    <span className="text-lg font-semibold">
                        IdeaHub<span className="text-teal-500/90 text-2xl">.</span>
                    </span>
                </div>
            </Link>
        </div>
    )
}

export { Logo }
