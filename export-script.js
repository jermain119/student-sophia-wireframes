// Wireframe to Figma Export Script
// Run this in browser console on any wireframe page to generate SVG

function exportWireframeAsSVG() {
    const wireframe = document.querySelector('.wireframe');
    if (!wireframe) {
        alert('No wireframe found on this page');
        return;
    }
    
    // Get wireframe dimensions
    const rect = wireframe.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    
    // Clone wireframe content
    const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    foreignObject.setAttribute('width', '100%');
    foreignObject.setAttribute('height', '100%');
    
    const clonedWireframe = wireframe.cloneNode(true);
    foreignObject.appendChild(clonedWireframe);
    svg.appendChild(foreignObject);
    
    // Download SVG
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `wireframe-${document.title.toLowerCase().replace(/\s+/g, '-')}.svg`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// Instructions to use this script:
console.log(`
To export current wireframe as SVG:
1. Copy and paste this entire script into browser console
2. Run: exportWireframeAsSVG()
3. SVG file will download automatically
4. Import the SVG into Figma
`);