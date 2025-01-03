import { SkeletonCard } from "./SkeletonCard"

export const ListOfSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    )
}