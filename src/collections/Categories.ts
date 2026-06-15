import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: () => true,
    update: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'sport'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'sport',
      type: 'select',
      options: [
        { label: 'Baseball', value: 'baseball' },
        { label: 'Basketball', value: 'basketball' },
        { label: 'Football', value: 'football' },
        { label: 'Hockey', value: 'hockey' },
        { label: 'Soccer', value: 'soccer' },
        { label: 'MMA', value: 'mma' },
        { label: 'Racing', value: 'racing' },
        { label: 'Wrestling', value: 'wrestling' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Lower numbers show first in navigation.',
        position: 'sidebar',
      },
    },
    slugField({
      position: undefined,
    }),
  ],
}
