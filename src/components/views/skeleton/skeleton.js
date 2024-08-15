import * as React from "react";
import {
  AspectRatio,
  Stack,
  Button,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/joy";
import { useMediaQuery } from "@mui/material";

export default function AnimationSkeleton() {
  const tablet768px = useMediaQuery("(max-width: 800px)");
  const mobile = useMediaQuery("(max-width: 425px)");
  return (
    <Stack spacing={2} useFlexGap>
      <Card
        variant="outlined"
        sx={{
          width: mobile ? 200 : tablet768px ? 400 : 600,
          "--Card-radius": (theme) => theme.vars.radius.xs,
          height: "auto",
        }}
      >
        <CardContent
          orientation={
            mobile ? "vertical" : tablet768px ? "horizontal" : "horizontal"
          }
        >
          <Skeleton
            animation="wave"
            variant="circular"
            width={48}
            height={48}
          />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
            <Skeleton
              animation="wave"
              variant="text"
              level="body-sm"
              sx={{ width: 200 }}
            />
          </div>
        </CardContent>
        <AspectRatio ratio="21/9">
          <Skeleton animation="wave" variant="overlay">
            <img
              alt=""
              src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            />
          </Skeleton>
        </AspectRatio>
        <Typography sx={{ overflow: "hidden" }}>
          <Skeleton animation="wave">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries.
          </Skeleton>
        </Typography>
        <Button>
          Read more
          <Skeleton animation="wave" />
        </Button>
      </Card>
    </Stack>
  );
}
