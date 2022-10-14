export enum FormActionType {
  setTitle,
  setDescription,
  setImage,
  setImageStatus,
  setAvatar,
  setType,
  setCategories,
  setPrice,
  setEmail,
  setPassword,
  setName,
  setSurname,
  setCommentText,
  setTicketId
}

export type FormAction = {
  type: FormActionType;
  payload: boolean | string | number | string[] | File | null | undefined;
};
