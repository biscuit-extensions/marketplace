import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, User } from "lucide-react";
import { Extension } from "@/types/extension";
import { useState } from "react";

interface ExtensionCardProps {
  extension: Extension;
}

export function ExtensionCard({ extension }: ExtensionCardProps) {
  const [showPopover, setShowPopover] = useState(false);

  const handleInstall = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: replace this with deep-link once Biscuit protocol is ready.
    setShowPopover((prev) => !prev);
  };

  const repoUrl = extension.repoUrl;

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              {extension.name}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{extension.author}</span>
              <Badge variant="outline" className="text-xs">
                v{extension.version}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {extension.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="relative flex gap-2">
            <Button size="sm" onClick={handleInstall} className="h-8">
              <Download className="h-3 w-3 mr-1" />
              Install
            </Button>
            {showPopover && (
              <div className="absolute top-full left-0 z-50 mt-2 w-72 rounded-md border bg-background p-4 text-sm shadow-lg">
                <p className="font-medium mb-2">Install in Biscuit</p>
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Open Biscuit.</li>
                  <li>
                    In the <strong>Extension Center</strong> search for "
                    {extension.name}" and click <em>Install</em>.
                  </li>
                  <li>
                    Or run <b>biscuit ext install {extension.id}</b> in the
                    command palette or integrated terminal.
                  </li>
                </ol>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => setShowPopover(false)}
                >
                  Got it
                </Button>
              </div>
            )}
            {repoUrl && (
              <Button asChild size="sm" variant="outline" className="h-8">
                <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Source Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
