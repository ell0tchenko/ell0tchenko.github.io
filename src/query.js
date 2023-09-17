export const queryList = {
  userQuery: `
    {
      user {
        id
        login
        attrs
      }
    }`,

  xpAmountQuery: `
    {
      transaction(where: { userId: { _eq: 6963 }
      type: {_eq: "xp"}}){
        amount
        path
      }
      }`,

  skillsQuery: `
    {
      transaction(where: { userId: { _eq: 6963 }}){
        amount
        type
        path
        createdAt
      }
      }`,
  nestedQuery: `
      {
        result {
          id
          user {
            id
            login
          }
        }
      }
`,
upAuditQuery: `
{
  transaction(where: { userId: { _eq: 6963 }
  type: {_eq: "up"}}){
    amount
  }
  }`,
  downAuditQuery: `
  {
    transaction(where: { userId: { _eq: 6963 }
    type: {_eq: "down"}}){
      amount
    }
    }`
}




