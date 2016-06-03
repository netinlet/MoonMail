'use strict';

import * as chai from 'chai';
import { respond } from './action';
import * as sinon from 'sinon';
import * as sinonAsPromised from 'sinon-as-promised';
import { List } from 'moonmail-models';

const expect = chai.expect;

describe('createEmailList', () => {

  const name = 'my list';
  const list = {name};
  let event;

  describe('#respond()', () => {
    beforeEach(() => {
      sinon.stub(List, 'save').resolves('ok');
    });

    context('when the event is valid', () => {
      before(() => {
        event = {list};
      });

      it('creates the list', (done) => {
        respond(event, (err, result) => {
          const args = List.save.firstCall.args[0];
          expect(args).to.have.property('userId');
          expect(args).to.have.property('id');
          expect(args).to.have.property('isDeleted', false.toString());
          expect(err).to.not.exist;
          expect(result).to.exist;
          done();
        });
      });
    });

    context('when the event is not valid', () => {
      event = {};
      it('returns an error message', (done) => {
        respond(event, (err, result) => {
          expect(result).to.not.exist;
          expect(err).to.exist;
          done();
        });
      });
    });

    afterEach(() => {
      List.save.restore();
    });
  });
});
