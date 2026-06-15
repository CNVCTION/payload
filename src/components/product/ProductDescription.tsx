'use client'
import type { Product, Variant } from '@/payload-types'

import { RichText } from '@/components/RichText'
import { AddToCart } from '@/components/Cart/AddToCart'
import { Price } from '@/components/Price'
import React, { Suspense } from 'react'

import { VariantSelector } from './VariantSelector'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'
import { StockIndicator } from '@/components/product/StockIndicator'

export function ProductDescription({ product }: { product: Product }) {
  const { currency } = useCurrency()
  const {
    playerName,
    team,
    sport,
    year,
    manufacturer,
    setName,
    cardNumber,
    rarity,
    isGraded,
    grade,
    isAutographed,
    isRookieCard,
    title,
    description,
    enableVariants,
    variants,
  } = product

  let amount = 0,
    lowestAmount = 0,
    highestAmount = 0
  const priceField = `priceIn${currency.code}` as keyof Product
  const hasVariants = enableVariants && Boolean(variants?.docs?.length)

  if (hasVariants) {
    const priceField = `priceIn${currency.code}` as keyof Variant
    const variantsOrderedByPrice = product.variants?.docs
      ?.filter((variant) => variant && typeof variant === 'object')
      .sort((a, b) => {
        if (
          typeof a === 'object' &&
          typeof b === 'object' &&
          priceField in a &&
          priceField in b &&
          typeof a[priceField] === 'number' &&
          typeof b[priceField] === 'number'
        ) {
          return a[priceField] - b[priceField]
        }

        return 0
      }) as Variant[]

    const lowestVariant = variantsOrderedByPrice[0][priceField]
    const highestVariant = variantsOrderedByPrice[variantsOrderedByPrice.length - 1][priceField]
    if (
      variantsOrderedByPrice &&
      typeof lowestVariant === 'number' &&
      typeof highestVariant === 'number'
    ) {
      lowestAmount = lowestVariant
      highestAmount = highestVariant
    }
  } else if (product[priceField] && typeof product[priceField] === 'number') {
    amount = product[priceField]
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-medium">{title}</h1>
        <div className="uppercase font-mono">
          {hasVariants ? (
            <Price highestAmount={highestAmount} lowestAmount={lowestAmount} />
          ) : (
            <Price amount={amount} />
          )}
        </div>
      </div>

      {(playerName || team || sport || year || manufacturer || setName || cardNumber || rarity || isRookieCard || isAutographed || isGraded) && (
        <>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm border rounded-lg p-4 bg-muted/30">
            {playerName && (
              <div>
                <span className="text-muted-foreground">Player</span>
                <p className="font-medium">{playerName}</p>
              </div>
            )}
            {team && (
              <div>
                <span className="text-muted-foreground">Team</span>
                <p className="font-medium">{team}</p>
              </div>
            )}
            {sport && (
              <div>
                <span className="text-muted-foreground">Sport</span>
                <p className="font-medium capitalize">{sport}</p>
              </div>
            )}
            {year && (
              <div>
                <span className="text-muted-foreground">Year</span>
                <p className="font-medium">{year}</p>
              </div>
            )}
            {manufacturer && (
              <div>
                <span className="text-muted-foreground">Brand</span>
                <p className="font-medium capitalize">{manufacturer.replace(/-/g, ' ')}</p>
              </div>
            )}
            {setName && (
              <div>
                <span className="text-muted-foreground">Set</span>
                <p className="font-medium">{setName}</p>
              </div>
            )}
            {cardNumber && (
              <div>
                <span className="text-muted-foreground">Card #</span>
                <p className="font-medium">{cardNumber}</p>
              </div>
            )}
            {rarity && (
              <div>
                <span className="text-muted-foreground">Rarity</span>
                <p className="font-medium capitalize">{rarity.replace(/-/g, ' ')}</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {isRookieCard && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                Rookie Card
              </span>
            )}
            {isAutographed && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Autographed
              </span>
            )}
            {isGraded && grade && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {grade.replace(/-/g, ' ').toUpperCase()}
              </span>
            )}
          </div>
          <hr />
        </>
      )}
      {description ? (
        <RichText className="" data={description} enableGutter={false} />
      ) : null}
      <hr />
      {hasVariants && (
        <>
          <Suspense fallback={null}>
            <VariantSelector product={product} />
          </Suspense>

          <hr />
        </>
      )}
      <div className="flex items-center justify-between">
        <Suspense fallback={null}>
          <StockIndicator product={product} />
        </Suspense>
      </div>

      <div className="flex items-center justify-between">
        <Suspense fallback={null}>
          <AddToCart product={product} />
        </Suspense>
      </div>
    </div>
  )
}
