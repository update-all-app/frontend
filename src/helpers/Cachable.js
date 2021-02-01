

export default class Cachable{


  static instances = {}

  static new_cache(id, ...args){
    const inst = new this(...args)
    this.instances[id] = inst
    return inst
  }

  static get_instance(id){
    return this.instances[id]
  }

  static remove_instance(id){
    delete this.instances[id]
  }


}