from lxml import etree

xml = etree.parse('catalogo.xml')
xsl = etree.parse('catalogo.xsl')

transform = etree.XSLT(xsl)
resultado = transform(xml)

with open('catalogo-tabla.html', 'wb') as f:
    f.write(resultado)

print("✓ catalogo-tabla.html generado correctamente")
