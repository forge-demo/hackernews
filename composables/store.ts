import { defineStore } from 'pinia'
import { Item, User } from '~/types'

interface StoreState {
  items: Record<number, Item>
  users: Record<number, User>
  feeds: Record<string, Record<number, number[]>>
}

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', () => {
  const state: StoreState = reactive({
    items: {},
    users: {},
    feeds: {}
  })

  validFeeds.forEach((feed) => {
    state.feeds[feed] = {}
  })

  function fetchFeed ({ feed, page, prefetch }: { feed: string; page: number; prefetch?: boolean }) {
    // Don't prioritize already fetched feeds
    if (state.feeds[feed][page] && state.feeds[feed][page].length) {
      prefetch = true
    }

    if (!prefetch) {
      // if (state.feedCancelSource) {
      //   state.feedCancelSource.cancel(
      //       `prioritize feed: ${feed} page: ${page}`,
      //   )
      // }
    }
    return lazyLoad(
      (items) => {
        const ids = items.map(item => item.id)
        state.feeds[feed][page] = ids
        items
          .filter(Boolean)
          .forEach((item) => { state.items[item.id] = item })
      },
      () => $fetch('/api/hn/feeds', { params: { feed, page } }),
      (state.feeds[feed][page] || []).map(id => state.items[id])
    )
  }

  function fetchItem (id: string) {
    return lazyLoad(
      (item) => {
        if (item) { state.items[item.id] = item }
      },
      () => $fetch('/api/hn/item', { params: { id } }),
      Object.assign({ id, loading: true, comments: [] }, state.items[id])
    )
  }

  function fetchUser (id: string) {
    return lazyLoad(
      (user) => {
        state.users[id] = user || false
      },
      () => $fetch('/api/hn/user', { params: { id } }),
      Object.assign({ id, loading: true }, state.users[id])
    )
  }

  return {
    ...toRefs(state),
    fetchFeed,
    fetchItem,
    fetchUser
  }
})
