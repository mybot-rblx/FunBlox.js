/* eslint-disable max-len */
import { groups } from '../api';
import cookieJar from '../utils/jar';
import getGeneralToken from '../utils/getGeneralToken';
import getGroupFunds from './getGroupFunds';
/**
 * **groupPayout**
 * @param { number } groupid
 * @param { number } userid
 * @param { number } amount
 * @param { boolean } recurring
 * @param { boolean } percentage
 * @return { Promise<Object> }
 */
export default function groupPayout(groupid: number, userid: number, amount: number, recurring?: boolean, percentage?: boolean): Promise<Object> {
  return new Promise(async (resolve, reject) => {

    if(typeof groupid === 'number' && typeof userid === 'number' && typeof amount === 'number'){
      const array = [{
        recipientId: userid,
        recipientType: 'User',
        amount: (percentage ? amount + '%' : amount)
      }]
      if(percentage === true && amount > 100 || percentage === true && amount < 1){
         reject(new TypeError('The percentage must be a number from 1 to 100.'))
      }

      await groups.post(`v1/groups/${groupid}/payouts${recurring ? '/recurring' : ''}`, {
        cookieJar, json: { Recipients: array, PayoutType: `${percentage ? 'Percentage' : 'FixedAmount'}` }, headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': await getGeneralToken() },
      }).then(async function() {
        
        return resolve(await getGroupFunds(groupid));
      }).catch(function(err) {
        return reject(err);
      });


      }

  })
}
