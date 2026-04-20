import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { Button } from "@/registry/new-york-v4/ui/button"
import { InlinePreview } from "@/components/docs/inline-preview"

export function CardDemoPreview() {
  return (
    <InlinePreview
      code={`<Card>
  <CardHeader>
    <CardTitle>Import Photos</CardTitle>
    <CardDescription>
      Copy photos from your SD card to your local library.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Select a source folder and destination to begin importing.</p>
  </CardContent>
</Card>`}
    >
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Import Photos</CardTitle>
            <CardDescription>
              Copy photos from your SD card to your local library.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Select a source folder and destination to begin importing.
            </p>
          </CardContent>
        </Card>
      </div>
    </InlinePreview>
  )
}

export function CardWithFooterPreview() {
  return (
    <InlinePreview
      code={`<Card>
  <CardHeader>
    <CardTitle>Publish Gallery</CardTitle>
    <CardDescription>
      Upload your edited photos to the public gallery.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>48 photos ready to publish from the June 2024 event.</p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button>Publish</Button>
    <Button variant="outline">Cancel</Button>
  </CardFooter>
</Card>`}
    >
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Publish Gallery</CardTitle>
            <CardDescription>
              Upload your edited photos to the public gallery.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              48 photos ready to publish from the June 2024 event.
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button>Publish</Button>
            <Button variant="outline">Cancel</Button>
          </CardFooter>
        </Card>
      </div>
    </InlinePreview>
  )
}
