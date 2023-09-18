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
      user {
        mystats:transactions(where: {
          type: {_eq:"xp"}
        })
        {
          amount
          path
        }
      }}`,

  skillsQuery: `
    {
      user {
        mystats:transactions        {
        amount
        type
        path
        createdAt
        }
      }
    }`,
  upAuditQuery: `
  {
    user {
      mystats:transactions(where: 
        {type: {_eq: "up"}}){
        amount
    }
    }}`,
      downAuditQuery: `
      {
        user {
          mystats:transactions(where: 
            {type: {_eq: "down"}}){
            amount
        }
        }}`
}




