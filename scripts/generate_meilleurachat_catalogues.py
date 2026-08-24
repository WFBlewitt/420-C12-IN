#!/usr/bin/env python3
from __future__ import annotations
import json
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Frame, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / 'docs' / 'assets' / 'data' / 'meilleurachat'
OUT_DIR = ROOT / 'docs' / 'assets' / 'catalogues'
FONT_REGULAR = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
pdfmetrics.registerFont(TTFont('DejaVu', FONT_REGULAR))
pdfmetrics.registerFont(TTFont('DejaVu-Bold', FONT_BOLD))
ACCENT = colors.HexColor('#1f4b6e'); LIGHT = colors.HexColor('#eaf2f7'); MID = colors.HexColor('#d2e1eb'); DARK = colors.HexColor('#23313d')

def load_data():
    meta = json.loads((DATA_DIR / 'catalogue.json').read_text(encoding='utf-8'))
    categories = {}
    for key in meta['category_order']:
        categories[key] = json.loads((DATA_DIR / 'categories' / f'{key}.json').read_text(encoding='utf-8'))
    return meta, categories

def money(value, lang):
    return f'{value:,} $'.replace(',', ' ') if lang == 'fr' else f'${value:,}'

def footer(canvas, doc):
    canvas.saveState(); canvas.setFont('DejaVu', 8); canvas.setFillColor(colors.HexColor('#5f6b74'))
    canvas.drawString(18*mm, 12*mm, 'MeilleurAchat - catalogue pédagogique fictif')
    canvas.drawRightString(letter[0]-18*mm, 12*mm, str(doc.page)); canvas.restoreState()

def build_pdf(meta, categories, lang, output):
    fr = lang == 'fr'; styles = getSampleStyleSheet()
    title = ParagraphStyle('title', parent=styles['Title'], fontName='DejaVu-Bold', fontSize=26, leading=31, textColor=ACCENT, alignment=TA_CENTER, spaceAfter=12)
    subtitle = ParagraphStyle('subtitle', parent=styles['Normal'], fontName='DejaVu', fontSize=12, leading=17, textColor=DARK, alignment=TA_CENTER, spaceAfter=12)
    h1 = ParagraphStyle('h1', parent=styles['Heading1'], fontName='DejaVu-Bold', fontSize=18, leading=22, textColor=ACCENT, spaceAfter=8)
    h2 = ParagraphStyle('h2', parent=styles['Heading2'], fontName='DejaVu-Bold', fontSize=12, leading=15, textColor=DARK, spaceBefore=8, spaceAfter=5)
    body = ParagraphStyle('body', parent=styles['BodyText'], fontName='DejaVu', fontSize=9.5, leading=13, textColor=DARK, spaceAfter=6)
    small = ParagraphStyle('small', parent=body, fontSize=8.5, leading=11)
    score = ParagraphStyle('score', parent=body, fontName='DejaVu-Bold', fontSize=13, leading=16, textColor=ACCENT, alignment=TA_CENTER)
    doc = BaseDocTemplate(str(output), pagesize=letter, rightMargin=18*mm, leftMargin=18*mm, topMargin=16*mm, bottomMargin=20*mm, title='MeilleurAchat')
    doc.addPageTemplates(PageTemplate(id='catalogue', frames=Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='normal'), onPage=footer))
    story=[Spacer(1,25*mm),Paragraph('MeilleurAchat',title),Paragraph('Catalogue de matériel informatique' if fr else 'Computer Hardware Catalogue',subtitle),Spacer(1,8*mm)]
    notice = "Tous les produits, prix, modèles et évaluations sont fictifs. Ce catalogue simule un détaillant généraliste et ne recommande aucun composant pour une carte mère particulière." if fr else "All products, prices, models, and ratings are fictional. This catalogue simulates a general hardware retailer and does not recommend components for any particular motherboard."
    story += [Table([[Paragraph(notice,body)]],colWidths=[doc.width],style=TableStyle([('BACKGROUND',(0,0),(-1,-1),LIGHT),('BOX',(0,0),(-1,-1),.75,ACCENT),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),10),('BOTTOMPADDING',(0,0),(-1,-1),10)])),Spacer(1,15*mm),Paragraph('Évaluation indépendante fictive : LaboPerformance' if fr else 'Fictional independent review source: LaboPerformance',score),Paragraph("Les notes sur 10 comparent uniquement les produits d'une même catégorie. Elles ne remplacent jamais la vérification de compatibilité ni l'analyse du besoin." if fr else "Scores out of 10 compare products only within the same category. They never replace compatibility checks or analysis of the client's needs.",subtitle),PageBreak()]
    story.append(Paragraph('Comment utiliser le catalogue' if fr else 'How to use the catalogue',h1))
    instructions = ["Lisez d'abord les exigences de la carte mère et du client dans le laboratoire." if fr else 'First read the motherboard and client requirements in the lab.','Relevez les interfaces, formats, dimensions, exigences électriques et notes pertinentes.' if fr else 'Extract the relevant interfaces, form factors, dimensions, electrical requirements, and ratings.',"Une excellente note LaboPerformance ne garantit pas qu'un produit convient à la plateforme ou au budget." if fr else 'An excellent LaboPerformance rating does not guarantee that a product suits the platform or budget.','Conservez les pages et valeurs utilisées comme preuves.' if fr else 'Record the pages and values used as evidence.']
    for i,text in enumerate(instructions,1): story.append(Paragraph(f'<b>{i}.</b> {text}',body))
    story += [Spacer(1,8*mm),Paragraph('Index',h1)]
    rows=[]; page=4
    for cat in categories.values():
      for product in cat['products'].values():
        rows.append([Paragraph(cat['fr' if fr else 'en'],small),Paragraph(product['label_fr' if fr else 'label_en'],small),str(page)]); page+=1
    t=Table(rows,colWidths=[38*mm,112*mm,12*mm]); t.setStyle(TableStyle([('GRID',(0,0),(-1,-1),.25,MID),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('ALIGN',(-1,0),(-1,-1),'CENTER')]))
    story += [t,PageBreak()]
    for cat in categories.values():
      category_name=cat['fr' if fr else 'en']; basis=cat['score_basis_fr' if fr else 'score_basis_en']
      for product in cat['products'].values():
        story += [Paragraph(category_name,h2),Paragraph(product['label_fr' if fr else 'label_en'],h1)]
        summary=Table([[Paragraph('Prix' if fr else 'Price',body),Paragraph(money(product['price'],lang),score)],[Paragraph('Indice LaboPerformance' if fr else 'LaboPerformance rating',body),Paragraph(f"{product['score']:.1f}/10",score)]],colWidths=[70*mm,85*mm])
        summary.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),LIGHT),('BOX',(0,0),(-1,-1),.75,ACCENT),('INNERGRID',(0,0),(-1,-1),.25,MID),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7)])); story += [summary,Spacer(1,6*mm),Paragraph('Spécifications' if fr else 'Specifications',h2)]
        specs=product['specs_fr' if fr else 'specs_en']; spec_rows=[[Paragraph(str(k),body),Paragraph(str(v),body)] for k,v in specs.items()]
        table=Table(spec_rows,colWidths=[65*mm,90*mm]); table.setStyle(TableStyle([('GRID',(0,0),(-1,-1),.4,MID),('BACKGROUND',(0,0),(0,-1),colors.HexColor('#f5f8fa')),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),6),('BOTTOMPADDING',(0,0),(-1,-1),6)]))
        story += [table,Spacer(1,7*mm),Paragraph('Évaluation LaboPerformance' if fr else 'LaboPerformance evaluation',h2),Paragraph(basis,body)]
        note=product['note_fr' if fr else 'note_en']; story.append(Table([[Paragraph(note,body)]],colWidths=[doc.width],style=TableStyle([('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#fff7df')),('BOX',(0,0),(-1,-1),.6,colors.HexColor('#b78a22')),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9)])))
        story += [Spacer(1,8*mm),Paragraph("Vérification requise : comparez ces données avec la documentation des autres composants concernés." if fr else 'Required verification: compare these values with the documentation for the other related components.',small),PageBreak()]
    doc.build(story)

def main():
    meta,categories=load_data(); OUT_DIR.mkdir(parents=True,exist_ok=True)
    build_pdf(meta,categories,'fr',OUT_DIR/'catalogue-meilleurachat.pdf')
    build_pdf(meta,categories,'en',OUT_DIR/'meilleurachat-hardware-catalogue.pdf')

if __name__ == '__main__': main()
