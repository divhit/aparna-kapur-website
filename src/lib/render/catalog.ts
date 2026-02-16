import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { z } from "zod";

/**
 * Real Estate Chat UI Catalog
 *
 * Components for rendering rich, structured content in the chat interface.
 * The AI generates JSON specs using these components to create visual layouts
 * for neighbourhood comparisons, market data, process guides, etc.
 */
export const realestateCatalog = defineCatalog(schema, {
  components: {
    // Layout
    Stack: {
      props: z.object({
        direction: z.enum(["horizontal", "vertical"]).nullable(),
        gap: z.enum(["sm", "md", "lg"]).nullable(),
      }),
      slots: ["default"],
      description: "Flex layout container",
      example: { direction: "vertical", gap: "md" },
    },

    Card: {
      props: z.object({
        title: z.string().nullable(),
        subtitle: z.string().nullable(),
      }),
      slots: ["default"],
      description: "Card container with optional title header",
      example: { title: "Oakridge", subtitle: "Market Overview" },
    },

    Grid: {
      props: z.object({
        columns: z.enum(["2", "3"]).nullable(),
        gap: z.enum(["sm", "md", "lg"]).nullable(),
      }),
      slots: ["default"],
      description: "Responsive grid layout",
      example: { columns: "3", gap: "md" },
    },

    // Typography
    Heading: {
      props: z.object({
        text: z.string(),
        level: z.enum(["h2", "h3", "h4"]).nullable(),
      }),
      description: "Section heading",
      example: { text: "Neighbourhood Comparison", level: "h3" },
    },

    Text: {
      props: z.object({
        content: z.string(),
        muted: z.boolean().nullable(),
      }),
      description: "Text content",
      example: { content: "Here is your market overview." },
    },

    // Data display
    Metric: {
      props: z.object({
        label: z.string(),
        value: z.string(),
        detail: z.string().nullable(),
        trend: z.enum(["up", "down", "neutral"]).nullable(),
      }),
      description:
        "Single metric display with label, value, and optional trend. Use for prices, scores, percentages.",
      example: {
        label: "Avg Price",
        value: "$1.6M",
        detail: "+8.2% YoY",
        trend: "up",
      },
    },

    Badge: {
      props: z.object({
        text: z.string(),
        variant: z.enum(["default", "success", "warning", "danger"]).nullable(),
      }),
      description: "Status badge or label",
      example: { text: "Hot Market", variant: "danger" },
    },

    Table: {
      props: z.object({
        data: z.array(z.record(z.string(), z.unknown())),
        columns: z.array(
          z.object({
            key: z.string(),
            label: z.string(),
          })
        ),
      }),
      description: "Data table for comparisons and listings",
      example: {
        data: [
          { neighbourhood: "Oakridge", price: "$1.6M", walk: 78 },
          { neighbourhood: "Kerrisdale", price: "$2.1M", walk: 85 },
        ],
        columns: [
          { key: "neighbourhood", label: "Neighbourhood" },
          { key: "price", label: "Avg Price" },
          { key: "walk", label: "Walk Score" },
        ],
      },
    },

    Callout: {
      props: z.object({
        type: z.enum(["info", "tip", "warning", "important"]).nullable(),
        title: z.string().nullable(),
        content: z.string(),
      }),
      description:
        "Highlighted callout box for tips, market insights, or important notes",
      example: {
        type: "tip",
        title: "First-Time Buyer?",
        content:
          "You may be exempt from Property Transfer Tax on homes up to $835K.",
      },
    },

    Accordion: {
      props: z.object({
        items: z.array(
          z.object({
            title: z.string(),
            content: z.string(),
          })
        ),
      }),
      description: "Collapsible sections for FAQs or detailed breakdowns",
      example: {
        items: [
          {
            title: "What is the Property Transfer Tax?",
            content: "A tax paid when purchasing property in BC...",
          },
        ],
      },
    },

    Timeline: {
      props: z.object({
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string().nullable(),
            status: z.enum(["completed", "current", "upcoming"]).nullable(),
          })
        ),
      }),
      description:
        "Vertical timeline for processes like buying/selling steps or project milestones",
      example: {
        items: [
          {
            title: "Get Pre-Approved",
            description: "Meet with a mortgage broker",
            status: "completed",
          },
          {
            title: "Find Your Home",
            description: "Tour properties with Aparna",
            status: "current",
          },
        ],
      },
    },

    Progress: {
      props: z.object({
        label: z.string(),
        value: z.number(),
        max: z.number().nullable(),
      }),
      description: "Progress/score bar. Use for walk scores, transit scores, etc.",
      example: { label: "Walk Score", value: 78, max: 100 },
    },

    Separator: {
      props: z.object({}),
      description: "Visual divider between sections",
    },

    Link: {
      props: z.object({
        text: z.string(),
        href: z.string(),
      }),
      description: "Clickable link",
      example: { text: "View Full Guide", href: "/neighborhoods/oakridge" },
    },
  },

  actions: {},
});
