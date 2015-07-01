'use strict';

/**
 * @ngdoc service
 * @name core.Services.DataPopulate
 * @description DataPopulate Service
 */
angular
    .module('core')
    .service('DataPopulate', [
        '$http',
        '$q',
        '$log',
        'localStorageService',
        'UserModel',
        'QueueModel',
        'OrganizationsModel',
        'ServicesModel',
        function($http, $q, $log, Storage, User, Queue, Orgs, Services) {
            var userSchema = {
                "phone": "1231212",
                "email": "test@test.com",
                "login": "DearTest",
                "password": "",
                "firstname": "Test",
                "lastname": "Test",
                "birthdate": "",
                "address": {
                    "cityid": 1,
                    "description": ""
                },
                "profile": {
                    "languageid": 1
                },
                "paytools": [
                    {
                        "paytoolid": "",
                        "pan": "",
                        "dateexp": ""
                    }
                ],
                id : 1,
                token : '12321'
            };

            var queuesSchema = [{
                id: 1,
                organization: {
                    name: "Организация 1",
                    id: 1
                },
                service : {
                    name: "Услуга 3",
                    id: 3
                },
                date: '2015-07-18',
                time: '13-00',
                rate: 3,
                isArchive : false
            },{
                id: 5,
                organization: {
                    name: "Организация 1",
                    id: 1
                },
                service : {
                    name: "Услуга 3",
                    id: 3
                },
                date: '2015-07-24',
                time: '13-00',
                rate: 3,
                isArchive : false
            },{
                id: 6,
                organization: {
                    name: "Организация 1",
                    id: 1
                },
                service : {
                    name: "Услуга 3",
                    id: 3
                },
                date: '2015-06-22',
                time: '13-00',
                rate: 5,
                isArchive : true
            }];

            var organizationsSchema = [{
                id : 1,
                name : "Организация 1"
            },{
                id : 2,
                name : "Организация 2"
            },{
                id : 3,
                name : "Организация 3"
            },{
                id : 4,
                name : "Организация 4"
            }];

            var servicesSchema = [{
                id : 1,
                name: 'Услуга 1'
            },{
                id : 2,
                name: 'Услуга 2'
            },{
                id : 3,
                name: 'Услуга 3'
            },{
                id : 4,
                name: 'Услуга 4'
            }];

            return {
                run : function() {
                    User.save(userSchema);
                    Queue.saveAll(queuesSchema);
                    Orgs.save(organizationsSchema);
                    Services.save(servicesSchema);
                }
            }
        }
    ]);