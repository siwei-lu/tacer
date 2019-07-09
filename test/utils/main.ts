import main from '~/utils/main'
import { expect } from 'chai'
import sinon from 'sinon'
import child_process from 'child_process'

describe('main()', () => {
  it('should throw an error without any parameter', () => {
    expect(main).to.throw()
  })

  it('should create a project in cwd when the path is not given', () => {
    const fakeSpawn = sinon.fake()
    sinon.replace(child_process, 'spawn', fakeSpawn)

    main('react')
    sinon.restore()

    fakeSpawn.calledOnce.should.true
    fakeSpawn.calledWith('npx', ['tacer-template-react', process.cwd()]).should
      .true
  })

  it('should create a project using the given template in the given path', () => {
    const fakeSpawn = sinon.fake()
    sinon.replace(child_process, 'spawn', fakeSpawn)

    main('react', '~/Desktop')
    sinon.restore()

    fakeSpawn.calledOnce.should.true
    fakeSpawn.calledWith('npx', ['tacer-template-react', '~/Desktop']).should
      .true
  })
})
