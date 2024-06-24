import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MoveLeftIcon,
  RotateCwIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from 'lucide-react';

export default function ToolBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool bar</CardTitle>
      </CardHeader>
      <CardContent className="relative h-[calc(100%-4rem)] overflow-hidden">
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <MoveLeftIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <RotateCwIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ZoomInIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ZoomOutIcon className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
