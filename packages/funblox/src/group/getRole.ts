import getRoles from "./getRoles";

interface RoleJSON{
  id: number;
  name: string;
  membercount: number;
}


/**
 *
 * @param { number } groupid
 * @return {Promise<Roles>}
 */
 export default function getRole( groupid: number, rank: number | string ): Promise<RoleJSON> {
  return new Promise(async (resolve, reject) => {

    const roles = await getRoles(groupid);
    if(typeof rank === 'number' || typeof rank === 'string' && typeof groupid === 'number') {

    if(typeof rank === 'string'){

      const result = roles.roles.find( ({ name }) => name === rank );

      return resolve({
        id: result.id,
        name: result.name,
        membercount: result.membercount
      })

  
  }else if(typeof rank === 'number'){
    const result = roles.roles.find( ({ id }) => id === rank );

    return resolve({
      id: result.id,
      name: result.name,
      membercount: result.membercount
    })

  }

   }else{
    reject(new TypeError('The rank must be a number/string and the groupID must be a number.'))
  }
 })
}