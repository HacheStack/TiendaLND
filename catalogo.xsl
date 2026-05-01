<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" encoding="UTF-8" indent="yes"
              doctype-public="-//W3C//DTD HTML 4.01//EN"/>

  <!-- ═══════════════════════════════════════════════
       PLANTILLA RAÍZ
  ═══════════════════════════════════════════════ -->
  <xsl:template match="/">
    <html lang="es">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Catálogo XML — Hache's Records</title>
      <link rel="stylesheet" href="assets/css/tabla.css"/>
    </head>
    <body>

      <!-- ── CABECERA ── -->
      <header>
        <div class="header__logo">
          <h1>Hache's Records</h1>
        </div>
        <a class="btn-volver" href="index.html">&#8592; Volver a la tienda</a>
      </header>

      <!-- ── HERO ── -->
      <section class="hero">
        <h2>Catálogo de Vinilos</h2>
        <p>
          Listado completo generado desde XML mediante transformación XSLT &#x2022;
          <xsl:value-of select="count(//disco)"/> referencias disponibles
        </p>
      </section>

      <main class="contenedor">

        <!-- ══════════════════════════════════════════
             SECCIÓN 1 — ESTADÍSTICAS
             XPath: sum(), count(), operaciones aritméticas (div)
        ══════════════════════════════════════════ -->
        <section class="seccion">
          <h2 class="seccion-titulo">Resumen del catálogo</h2>
          <div class="xpath-note">
            XPath: sum(//precio) | count(//disco) | sum(//precio) div count(//disco) | count(//disco[estado='Mint'])
          </div>
          <div class="stats-grid">

            <!-- Total de discos -->
            <div class="stat-card">
              <span class="stat-valor">
                <xsl:value-of select="count(//disco)"/>
              </span>
              <span class="stat-label">Discos en catálogo</span>
            </div>

            <!-- Valor total del catálogo -->
            <div class="stat-card">
              <span class="stat-valor">
                <xsl:value-of select="sum(//precio)"/> &#8364;
              </span>
              <span class="stat-label">Valor total del catálogo</span>
            </div>

            <!-- Precio medio: sum / count -->
            <div class="stat-card">
              <span class="stat-valor">
                <xsl:value-of select="format-number(sum(//precio) div count(//disco), '##.00')"/> &#8364;
              </span>
              <span class="stat-label">Precio medio</span>
            </div>

            <!-- Discos en estado Mint (filtro XPath) -->
            <div class="stat-card">
              <span class="stat-valor">
                <xsl:value-of select="count(//disco[estado='Mint'])"/>
              </span>
              <span class="stat-label">Discos en estado Mint</span>
            </div>

            <!-- Disco más caro: precio máximo mediante XPath -->
            <div class="stat-card">
              <span class="stat-valor">
                <xsl:value-of select="//disco[not(precio &lt; //precio)]/precio"/> &#8364;
              </span>
              <span class="stat-label">Precio más alto</span>
            </div>

            <!-- Disco más económico -->
            <div class="stat-card">
              <span class="stat-valor">
                <xsl:value-of select="//disco[not(precio > //precio)]/precio"/> &#8364;
              </span>
              <span class="stat-label">Precio más bajo</span>
            </div>

          </div>
        </section>

        <!-- ══════════════════════════════════════════
             SECCIÓN 2 — CATÁLOGO COMPLETO ORDENADO POR PRECIO
             XPath: xsl:sort select="precio" order="ascending"
        ══════════════════════════════════════════ -->
        <section class="seccion">
          <h2 class="seccion-titulo">Catálogo completo</h2>
          <div class="xpath-note">
            XPath: xsl:sort select="numero(precio)" data-type="number" order="ascending"
          </div>
          <div class="tabla-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Título</th>
                  <th>Artista</th>
                  <th>Año</th>
                  <th>Género</th>
                  <th>Estado</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <!-- Ordenado por precio de menor a mayor -->
                <xsl:for-each select="//disco">
                  <xsl:sort select="precio" data-type="number" order="ascending"/>
                  <tr>
                    <td class="td-num"><xsl:value-of select="position()"/></td>
                    <td class="td-titulo"><xsl:value-of select="titulo"/></td>
                    <td><xsl:value-of select="artista"/></td>
                    <td class="td-num"><xsl:value-of select="anio"/></td>
                    <td><xsl:value-of select="genero"/></td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="estado='Mint'">
                          <span class="badge badge-mint">Mint</span>
                        </xsl:when>
                        <xsl:when test="estado='VG+'">
                          <span class="badge badge-vgp">VG+</span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge badge-vg"><xsl:value-of select="estado"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="td-precio"><xsl:value-of select="precio"/> &#8364;</td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ══════════════════════════════════════════
             SECCIÓN 3 — SÓLO DISCOS EN ESTADO MINT
             XPath: filtro con predicado [estado='Mint']
             Ordenado por año de publicación
        ══════════════════════════════════════════ -->
        <section class="seccion">
          <h2 class="seccion-titulo">
            Selección Mint
            (<xsl:value-of select="count(//disco[estado='Mint'])"/> discos)
          </h2>
          <div class="xpath-note">
            XPath: //disco[estado='Mint'] | xsl:sort select="anio" order="ascending"
          </div>
          <div class="tabla-wrapper">
            <table class="tabla-mini">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Artista</th>
                  <th>Año</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="//disco[estado='Mint']">
                  <xsl:sort select="anio" data-type="number" order="ascending"/>
                  <tr>
                    <td class="td-titulo"><xsl:value-of select="titulo"/></td>
                    <td><xsl:value-of select="artista"/></td>
                    <td class="td-num"><xsl:value-of select="anio"/></td>
                    <td class="td-precio"><xsl:value-of select="precio"/> &#8364;</td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ══════════════════════════════════════════
             SECCIÓN 4 — DISCOS POR GÉNERO (Jazz)
             XPath: filtro [genero='Jazz'], cálculo de
             porcentaje sobre total
        ══════════════════════════════════════════ -->
        <section class="seccion">
          <h2 class="seccion-titulo">Sección Jazz</h2>
          <div class="xpath-note">
            XPath: //disco[genero='Jazz'] | format-number(count div total * 100, '##.0') | sum(//disco[genero='Jazz']/precio)
          </div>
          <div class="tabla-wrapper">
            <table class="tabla-mini">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Artista</th>
                  <th>Año</th>
                  <th>Estado</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="//disco[genero='Jazz']">
                  <xsl:sort select="anio" data-type="number" order="ascending"/>
                  <tr>
                    <td class="td-titulo"><xsl:value-of select="titulo"/></td>
                    <td><xsl:value-of select="artista"/></td>
                    <td class="td-num"><xsl:value-of select="anio"/></td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="estado='Mint'">
                          <span class="badge badge-mint">Mint</span>
                        </xsl:when>
                        <xsl:when test="estado='VG+'">
                          <span class="badge badge-vgp">VG+</span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge badge-vg"><xsl:value-of select="estado"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="td-precio"><xsl:value-of select="precio"/> &#8364;</td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          <!-- Estadísticas de la subsección Jazz -->
          <p style="margin-top:1rem; font-size:0.85rem; color:var(--texto-t);">
            Discos de Jazz en catálogo:
            <strong style="color:var(--dorado)">
              <xsl:value-of select="count(//disco[genero='Jazz'])"/>
            </strong>
            &#160;&#x2022;&#160;
            Valor total Jazz:
            <strong style="color:#e0824e">
              <xsl:value-of select="sum(//disco[genero='Jazz']/precio)"/> &#8364;
            </strong>
            &#160;&#x2022;&#160;
            Representan el
            <strong style="color:var(--dorado)">
              <xsl:value-of select="format-number(count(//disco[genero='Jazz']) div count(//disco) * 100, '##.0')"/>%
            </strong>
            del catálogo
          </p>
        </section>

        <!-- ══════════════════════════════════════════
             SECCIÓN 5 — DISCOS ANTERIORES A 1980
             XPath: filtro compuesto [number(anio) &lt; 1980]
             Ordenado por año descendente
        ══════════════════════════════════════════ -->
        <section class="seccion">
          <h2 class="seccion-titulo">Clásicos anteriores a 1980</h2>
          <div class="xpath-note">
            XPath: //disco[number(anio) &lt; 1980] | xsl:sort select="anio" order="descending"
          </div>
          <div class="tabla-wrapper">
            <table class="tabla-mini">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Artista</th>
                  <th>Año</th>
                  <th>Género</th>
                  <th>Estado</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="//disco[number(anio) &lt; 1980]">
                  <xsl:sort select="anio" data-type="number" order="descending"/>
                  <tr>
                    <td class="td-titulo"><xsl:value-of select="titulo"/></td>
                    <td><xsl:value-of select="artista"/></td>
                    <td class="td-num"><xsl:value-of select="anio"/></td>
                    <td><xsl:value-of select="genero"/></td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="estado='Mint'">
                          <span class="badge badge-mint">Mint</span>
                        </xsl:when>
                        <xsl:when test="estado='VG+'">
                          <span class="badge badge-vgp">VG+</span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge badge-vg"><xsl:value-of select="estado"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="td-precio"><xsl:value-of select="precio"/> &#8364;</td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </section>

      </main>

      <!-- ── FOOTER ── -->
      <footer>
        <p>
          Hache's Records &#169; 2026 &#160;&#x2022;&#160;
          Catálogo generado mediante transformación XSLT desde
          <a href="catalogo.xml">catalogo.xml</a> &#160;&#x2022;&#160;
          <a href="index.html">Volver a la tienda</a>
        </p>
      </footer>

    </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
