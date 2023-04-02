import { UserType } from '@/components/user'

export const keepFollowSet = (pre: UserType[], cur: UserType[]) => {
  const find = [...pre]
  for (let it of cur) {
    if (!find.find(item => it.user_id === item.user_id)) {
      find.push(it)
    } else {
      const idx = find.findIndex(item => it.user_id === item.user_id)
      find[idx] = { ...it }
    }
  }
  return find
}
