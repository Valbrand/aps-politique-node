// <reference path='../model/data/database/mongodb/mongoose.d.ts'/>

import Mongoose = require('mongoose');

import Facade = require('../model/Facade');
import ERepositoryType = require("../model/data/utils/ERepositoryType");

var PartnerCompanyModel = Mongoose.model('PartnerCompanies');

const TEMPLATE_NAMES = {
    HOME : 'home',
    NEW_COMPANY: 'cadastrarEmpresa',
    NEW_MEMBER:'cadastrarMembro',
    NEW_EVENT:'cadastrarEvento',
    SEARCH_COMPANY:'consultarEmpresa',
    SEARCH_MEMBER:'consultarMembro',
    SEARCH_EVENT:'consultarEvento'
};

class Controller {
    private facade: Facade;

    constructor() {
        this.facade = new Facade(ERepositoryType.ERepositoryType.ERepositoryType.mongoose);
    }

    public home(request, reply) : void {
        reply.view(TEMPLATE_NAMES.HOME);
    }

    public newPartnerCompany(request, reply) : void {
        reply.view(TEMPLATE_NAMES.NEW_COMPANY);
    }

    public newPartnerCompanyPOST = (request, reply) => {
        var partnerCompany = PartnerCompanyModel.hydrateFromPlainObject(request.payload);

        this.facade.insertPartnerCompany(partnerCompany, (err, object) => {
            if (err) throw err;

            // TODO: mudar o template para o qual o usuário será redirecionado ao registrar a empresa
            reply.view(TEMPLATE_NAMES.NEW_COMPANY);
        });
    }

    public newEvent(request, reply) : void{
        reply.view(TEMPLATE_NAMES.NEW_EVENT);
    }

    public newMember(request, reply) : void{
        reply.view(TEMPLATE_NAMES.NEW_MEMBER);
    }

    public login(request, reply) : void {
        reply('login');
    }

    public logout(request, reply) : void {
        reply('logout');
    }

    public profile(request, reply) : void {
        reply('profile');
    }

    public searchCompanies = (request, reply) => {
        var processedQuery = {};

        for (var key in request.query) {
            if (request.query.hasOwnProperty(key)) {
                if (typeof request.query[key] === 'string') {
                    processedQuery[key] = { '$regex' : new RegExp(`.*${request.query[key]}.*`, 'i') }
                } else if (key === 'address'){
                    for (var key2 in request.query[key]){
                        if (typeof request.query[key][key2] === 'string') {
                            processedQuery[key+'.'+key2] = { '$regex': new RegExp(`.*${request.query[key][key2]}.*`, 'i') }
                        }
                    }
                }
            }
        }

        this.facade.getPartnerCompanies(processedQuery, (err, companies) => {
            reply.view(TEMPLATE_NAMES.SEARCH_COMPANY, { 'companies': companies });
        });
    }

    public searchEvents(request, reply) : void {
        reply(TEMPLATE_NAMES.SEARCH_MEMBER);
    }

    public searchMembers(request, reply) : void {
        reply(TEMPLATE_NAMES.SEARCH_EVENT);
    }

    public removeCompany = (request, reply) => {
        this.facade.getPartnerCompanies({'_id' : request.query['id']}, (err, companies) => {
            if (companies[0]){
                var partnerCompany = PartnerCompanyModel.hydrateFromPlainObject(companies[0]);
                this.facade.removePartnerCompany(partnerCompany, (err) => {
                    request.query = {};
                    this.searchCompanies(request, reply);
                });    
            } else{
                // no company found with that id
            }

            
        });
        
    }

}

export = Controller;
