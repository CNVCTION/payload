import type { Product, Variant } from '@/payload-types'

import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title, playerName, team, year, isRookieCard, rarity } = product

  let price = priceInUSD

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInUSD &&
      typeof variant.priceInUSD === 'number'
    ) {
      price = variant.priceInUSD
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <Link className="relative inline-block h-full w-full group" href={`/products/${product.slug}`}>
      <div className="relative aspect-square border rounded-2xl bg-primary-foreground overflow-hidden">
        {image ? (
          <Media
            className="relative aspect-square object-cover p-4"
            height={80}
            imgClassName={clsx('h-full w-full object-contain rounded-xl', {
              'transition duration-300 ease-in-out group-hover:scale-105': true,
            })}
            resource={image}
            width={80}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No Image
          </div>
        )}
        {isRookieCard && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            RC
          </span>
        )}
        {rarity === 'one-of-one' && (
          <span className="absolute top-2 right-2 bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded">
            1/1
          </span>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <div className="font-semibold text-sm leading-tight group-hover:text-primary">
          {title}
        </div>
        {(playerName || team || year) && (
          <div className="text-xs text-muted-foreground">
            {[playerName, team, year].filter(Boolean).join(' · ')}
          </div>
        )}
        <div className="flex justify-between items-center pt-1">
          {typeof price === 'number' ? (
            <Price amount={price} />
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
        </div>
      </div>
    </Link>
  )
}
