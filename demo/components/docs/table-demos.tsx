import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"
import { InlinePreview } from "@/components/docs/inline-preview"

const PHOTOS = [
  { filename: "DSC_0042.CR3", type: "RAW", size: "24.1 MB", status: "Imported" },
  { filename: "DSC_0043.CR3", type: "RAW", size: "23.8 MB", status: "Imported" },
  { filename: "DSC_0044.JPG", type: "JPEG", size: "6.2 MB", status: "Skipped" },
  { filename: "DSC_0045.CR3", type: "RAW", size: "25.0 MB", status: "Pending" },
]

export function TableDemoPreview() {
  return (
    <InlinePreview
      code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Filename</TableHead>
      <TableHead>Type</TableHead>
      <TableHead>Size</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>DSC_0042.CR3</TableCell>
      <TableCell>RAW</TableCell>
      <TableCell>24.1 MB</TableCell>
      <TableCell>Imported</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Filename</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PHOTOS.map((photo) => (
            <TableRow key={photo.filename}>
              <TableCell className="font-mono">{photo.filename}</TableCell>
              <TableCell>{photo.type}</TableCell>
              <TableCell>{photo.size}</TableCell>
              <TableCell>{photo.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </InlinePreview>
  )
}
