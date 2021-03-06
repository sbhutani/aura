/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
({
	createItems: function (cmp, currentPage, pageSize) {
    	var items = [];

        // Hack to make 'zero based'. 
        --currentPage;
        var tmpId;
        
        for (var i = 1; i <= pageSize; i++) {
        	tmpId = ((currentPage * pageSize) + i);
        	randomNumber = Math.floor(Math.random()*1E16),
            items.push({
                _id           : randomNumber,
                index: tmpId,
                balance : Math.floor(Math.random() * 100000 + 1),
                name : 'John Doe '+tmpId, 
                friends: [
                 {
                   "id": 0,
                   "name": "Kris Finch " + randomNumber
                 },
                 {
                   "id": 1,
                   "name": "Etta Pate " + randomNumber
                 },
                 {
                   "id": 2,
                   "name": "Joanne Gardner " + randomNumber
                 }
               ]
            });
        }
        return cmp.get("v.empty") ? [] : items;
    }
})