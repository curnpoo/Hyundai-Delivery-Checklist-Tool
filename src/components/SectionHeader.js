export class SectionHeader {
    constructor(title) {
        this.title = title;
    }

    render() {
        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = `<h2>${this.title}</h2>`;
        return header;
    }
}
