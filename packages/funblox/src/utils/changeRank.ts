import { groups } from '../api';
import getGroupRank from '../user/getUserRank';
import setRank from '../group/setRank';




/**
 * **Change Rank**
 * @param {number } groupid
 * @param { number | string } user
 * @param { number } method
 * @return {Promise<Object>}
 */

export default async function (groupid: number, user: number, method: number): Promise<Object> {
  return new Promise(async (resolve, reject) => {
    const roleResponse = await groups.get(
      `v1/groups/${groupid}/roles`,
  );
 const userrank = await getGroupRank(groupid, user)

 for (let i = 0; i < roleResponse.roles.length; i++) {
  const role = roleResponse.roles[i]
  const Rank = role.id

  if (Rank === userrank.id) {
    const change = i + method
    const nextrank = roleResponse.roles[change]
    const index = roleResponse.roles.indexOf(nextrank)
    const role = roleResponse.roles[index]

    if(nextrank === 0) {
      reject(TypeError("Can't demote someone to rank 0 (GUEST) unless I exile them..."))
    }else if(!nextrank){
      reject(TypeError("Can't find this user next rank..."))

    }else if(nextrank > 0 && nextrank && nextrank < 255){
      await setRank(groupid, user, index.rolese).then(async function() {

        return resolve({ newRank: role, oldRank: userrank });
      }).catch(function(err) {
        reject(TypeError(err));
      })
    }
  }
}




  })
}