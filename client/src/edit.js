
export class Edit{

  evidenceId = null;

  activate(params) {
    if (params.id) {
      this.evidenceId = params.id;
    }
  }
}
