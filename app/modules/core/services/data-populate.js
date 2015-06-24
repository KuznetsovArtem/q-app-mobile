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
        function($http, $q, $log, Storage, User, Queue) {
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
                organization: 'TestOrganization_1',
                service : 'TestService_1',
                date: '12/08/2015',
                time: '13-00',
                rate: 3
            },{
                id: 2,
                organization: 'TestOrganization_2',
                service : 'TestService_2',
                date: '12/09/2015',
                time: '14-00',
                rate: 4
            },{
                id: 3,
                organization: 'TestOrganization_3',
                service : 'TestService_3',
                date: '12/08/2015',
                time: '13-00',
                rate: 3
            },{
                id: 4,
                organization: 'TestOrganization_4',
                service : 'TestService_4',
                date: '12/08/2015',
                time: '13-00',
                rate: 3
            },{
                id: 5,
                organization: 'TestOrganization_5',
                service : 'TestService_5',
                date: '12/08/2015',
                time: '13-00',
                rate: 3
            }];

            function storageSave(modelName, modelData) {
                Storage.set(modelName, angular.toJson(modelData));
                return modelData;
            }

            return {
                run : function() {
                    $log.log('running populating models...')
                    User.save(userSchema);
                    Queue.save(queuesSchema);
                    $log.log('...done.');
                    //storageSave('userModel', userSchema);
                    //storageSave('queuesModel', queuesSchema);
                }
            }
        }
    ]);