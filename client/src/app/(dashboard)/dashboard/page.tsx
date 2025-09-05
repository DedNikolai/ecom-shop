
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {

    return (
             <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-semibold">$24,560</CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Orders</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-semibold">1,248</CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Customers</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-semibold">7,431</CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Refunds</CardTitle></CardHeader>
                    <CardContent className="text-2xl font-semibold">32</CardContent>
                </Card>
            </div>
    )
}