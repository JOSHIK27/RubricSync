import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export default function HistoryCard() {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-blue-800">ID: 1</h3>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Score: 10
          </Badge>
        </div>
        <div className="flex items-center text-blue-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>10:30 AM</span>
        </div>
      </CardContent>
      <CardFooter className="bg-blue-100 p-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Add to Workspace
        </Button>
      </CardFooter>
    </Card>
  );
}
