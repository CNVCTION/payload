import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from 'payload'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { DefaultDocumentIDType, Where } from 'payload'

export const ProductsCollection: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  admin: {
    ...defaultCollection?.admin,
    defaultColumns: ['title', 'playerName', 'sport', 'year', 'priceInUSD', '_status'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'products',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'products',
        req,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    ...defaultCollection?.defaultPopulate,
    title: true,
    slug: true,
    playerName: true,
    sport: true,
    year: true,
    variantOptions: true,
    variants: true,
    enableVariants: true,
    gallery: true,
    priceInUSD: true,
    inventory: true,
    meta: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'gallery',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'variantOption',
                  type: 'relationship',
                  relationTo: 'variantOptions',
                  admin: {
                    condition: (data) => {
                      return data?.enableVariants === true && data?.variantTypes?.length > 0
                    },
                  },
                  filterOptions: ({ data }) => {
                    if (data?.enableVariants && data?.variantTypes?.length) {
                      const variantTypeIDs = data.variantTypes.map((item: any) => {
                        if (typeof item === 'object' && item?.id) {
                          return item.id
                        }
                        return item
                      }) as DefaultDocumentIDType[]

                      if (variantTypeIDs.length === 0)
                        return {
                          variantType: {
                            in: [],
                          },
                        }

                      const query: Where = {
                        variantType: {
                          in: variantTypeIDs,
                        },
                      }

                      return query
                    }

                    return {
                      variantType: {
                        in: [],
                      },
                    }
                  },
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: 'Card Description',
              required: false,
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock],
            },
          ],
          label: 'Content',
        },
        {
          label: 'Card Details',
          fields: [
            {
              name: 'playerName',
              type: 'text',
              admin: {
                description: 'Player featured on this card.',
              },
            },
            {
              name: 'team',
              type: 'text',
              admin: {
                description: 'Team the player was on when the card was issued.',
              },
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
              name: 'year',
              type: 'number',
              admin: {
                description: 'Release year of the card.',
              },
            },
            {
              name: 'manufacturer',
              type: 'select',
              options: [
                { label: 'Topps', value: 'topps' },
                { label: 'Panini', value: 'panini' },
                { label: 'Upper Deck', value: 'upper-deck' },
                { label: 'Bowman', value: 'bowman' },
                { label: 'Fleer', value: 'fleer' },
                { label: 'Donruss', value: 'donruss' },
                { label: 'Leaf', value: 'leaf' },
                { label: 'Wild Card', value: 'wild-card' },
                { label: 'Other', value: 'other' },
              ],
            },
            {
              name: 'setName',
              type: 'text',
              admin: {
                description: 'Name of the card set or series.',
              },
            },
            {
              name: 'cardNumber',
              type: 'text',
              admin: {
                description: 'Card number within the set.',
              },
            },
            {
              name: 'rarity',
              type: 'select',
              options: [
                { label: 'Common', value: 'common' },
                { label: 'Uncommon', value: 'uncommon' },
                { label: 'Rare', value: 'rare' },
                { label: 'Super Rare', value: 'super-rare' },
                { label: 'Ultra Rare', value: 'ultra-rare' },
                { label: '1 of 1', value: 'one-of-one' },
                { label: 'Serial Numbered (/25, /100, etc.)', value: 'numbered' },
              ],
            },
            {
              name: 'isGraded',
              type: 'checkbox',
              label: 'Professionally Graded',
              defaultValue: false,
            },
            {
              name: 'grade',
              type: 'select',
              admin: {
                condition: (data) => data?.isGraded === true,
              },
              options: [
                { label: 'PSA 10 (Gem Mint)', value: 'psa-10' },
                { label: 'PSA 9 (Mint)', value: 'psa-9' },
                { label: 'PSA 8 (NM-MT)', value: 'psa-8' },
                { label: 'PSA 7 (Near Mint)', value: 'psa-7' },
                { label: 'BGS 10 (Pristine)', value: 'bgs-10' },
                { label: 'BGS 9.5 (Gem Mint)', value: 'bgs-95' },
                { label: 'BGS 9 (Mint)', value: 'bgs-9' },
                { label: 'SGC 10 (Pristine)', value: 'sgc-10' },
                { label: 'SGC 9.5 (Mint+)', value: 'sgc-95' },
                { label: 'Other', value: 'other' },
              ],
            },
            {
              name: 'isAutographed',
              type: 'checkbox',
              label: 'Autographed',
              defaultValue: false,
            },
            {
              name: 'isRookieCard',
              type: 'checkbox',
              label: 'Rookie Card',
              defaultValue: false,
            },
          ],
        },
        {
          fields: [
            ...defaultCollection.fields,
            {
              name: 'relatedProducts',
              type: 'relationship',
              filterOptions: ({ id }) => {
                if (id) {
                  return {
                    id: {
                      not_in: [id],
                    },
                  }
                }

                return {
                  id: {
                    exists: true,
                  },
                }
              },
              hasMany: true,
              relationTo: 'products',
            },
          ],
          label: 'Product Details',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        position: 'sidebar',
        sortOptions: 'title',
      },
      hasMany: true,
      relationTo: 'categories',
    },
    slugField(),
  ],
})
