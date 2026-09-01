import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const CartFoodCart = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                    View your key metrics and recent project activity. Track progress
                    across all your active projects.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
                You have 12 active projects and 3 pending tasks.
            </CardContent>
        </Card>
    )
}