import { Input } from "./ui/input";
import { Label } from "./ui/label";
export default function FileUpload() {
  return (
    <div className="mt-2">
      <Label htmlFor="Report">Report</Label>
      <Input type="file" className="mb-2" />
      <Label htmlFor="Rubric">Rubric</Label>
      <Input type="file" />
    </div>
  );
}
