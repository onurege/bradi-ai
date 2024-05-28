import Image from "next/image";

interface EmptyProps {
    label: string
}

export const Empty = ({
    label
}: EmptyProps) => {

    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image
                    alt="Empty"
                    fill
                    src = "/empty.png"
                    className="rounded-lg shadow-2xl"
                />
            </div>
            <p className="text-muted-foreground text-sm text-center pt-4">
                {label}
            </p>
        </div>
    );
}

