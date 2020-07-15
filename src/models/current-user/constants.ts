export enum PartnerStatuses {
  NONE = 'NONE',
  CREATED = 'CREATED',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

export const MessagesByStatus: Record<Exclude<PartnerStatuses, PartnerStatuses.NONE>, string> = {
  [PartnerStatuses.CREATED]: 'Ваша заявка принята и находится на рассмотрении',
  [PartnerStatuses.APPROVED]: 'Ваша заявка одобрена',
  [PartnerStatuses.DECLINED]: 'Ваша заявка отклонена',
};
