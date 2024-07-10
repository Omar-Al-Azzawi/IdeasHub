import IdeasList from "@/components/IdeasList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
    user: any
    ideas: any
}

const IdeasTabs = ({ user, ideas }: Props) => {
    return (
        <div className="mt-4">
            <h1 className="mb-4">My Ideas</h1>
            <Tabs defaultValue="all">
                <TabsList className="flex">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="py-8">
                    <IdeasList
                        user={user}
                        ideas={ideas}
                    />
                </TabsContent>
                <TabsContent value="published" className="py-8 px-6">Published</TabsContent>
                <TabsContent value="unpublished" className="py-8 px-6">Unpublished</TabsContent>
            </Tabs>
        </div>
    )
}

export { IdeasTabs }
