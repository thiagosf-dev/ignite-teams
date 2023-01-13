import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string) {
  try {
    const storageGroups = await groupsGetAll()
    const newStorage = JSON.stringify([...storageGroups, newGroup])
    const groupAlreadyExist = storageGroups.includes(newGroup)
    if (groupAlreadyExist) throw new AppError('Já existe um grupo cadastrado com esse nome!')
    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      newStorage
    )
  } catch (error) {
    throw error
  }
}